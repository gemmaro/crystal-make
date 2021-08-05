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
    end
  end
end
