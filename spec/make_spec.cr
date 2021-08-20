require "./spec_helper"

fixtures_root = Path.new(__DIR__) / "fixtures"

describe Make do
  describe Make::Tasks do
    describe "file" do
      it "Make#run can take String (which can become Path) as argument" do
        path_string = (fixtures_root / "aaa.txt").to_s

        Make.new do |a|
          a.file path_string do
          end
        end.run(path_string)
      end

      it "generates *path* if it is older than *sources*" do
        aaa_path = fixtures_root / "aaa.txt"
        bbb_path = fixtures_root / "bbb.txt"

        File.touch(aaa_path)
        File.touch(bbb_path)

        counter = 0

        Make.new do |a|
          a.file aaa_path, bbb_path do
            File.touch(aaa_path)
            counter += 1
          end
        end.run(aaa_path)

        counter.should eq 1
      end

      it "doesn't generate *path* if it is newer than *sources*" do
        aaa_path = fixtures_root / "aaa.txt"
        bbb_path = fixtures_root / "bbb.txt"

        File.touch(bbb_path)
        File.touch(aaa_path)

        counter = 0

        Make.new do |a|
          a.file aaa_path, bbb_path do
            File.touch(aaa_path)
            counter += 1
          end
        end.run(aaa_path)

        counter.should eq 0
      end
    end

    describe "command" do
      # Reference: https://github.com/MakeNowJust/crake/blob/fa394db507b336512a5daa8cbae374fd240ee189/spec/crake_spec.cr
      it "counter" do
        counter = 0

        Make.new do |a|
          a.command :foo, :bar do
            counter += 1
          end

          a.command :bar do
            counter += 2
          end
        end.run(:foo)

        counter.should eq 3
      end

      it "multiple sources and prerequisites" do
        counter = 0

        Make.new do |a|
          a.command :aaa, [:bbb,
                           (fixtures_root / "aaa.txt").to_s,
                           fixtures_root / "bbb.txt",
                           [:ccc,
                            (fixtures_root / "ccc.txt").to_s,
                            fixtures_root / "ddd.txt"]] do
            counter += 1
          end

          a.command(:bbb, (fixtures_root / "eee.txt").to_s) do
            counter += 10
          end

          a.command :ccc, fixtures_root / "fff.txt" do
            counter += 100
          end
        end.run(:aaa)

        counter.should eq 111
      end
    end
  end
end
