require "./spec_helper"

describe Make do
  describe Make::Tasks do
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
                           (Path.new(__DIR__) / "fixtures/aaa.txt").to_s,
                           Path.new(__DIR__) / "fixtures/bbb.txt",
                           [:ccc,
                            (Path.new(__DIR__) / "fixtures/ccc.txt").to_s,
                            Path.new(__DIR__) / "fixtures/ddd.txt"]] do
            counter += 1
          end

          a.command(:bbb, (Path.new(__DIR__) / "fixtures/eee.txt").to_s) do
            counter += 10
          end

          a.command :ccc, Path.new(__DIR__) / "fixtures/fff.txt" do
            counter += 100
          end
        end.run(:aaa)

        counter.should eq 111
      end
    end
  end
end
