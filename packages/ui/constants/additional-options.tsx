import { QuestionIcon } from "@repo/ui/assets/icons/question-icon";
import MissingIcon from "@repo/ui/assets/icons/MissingIcon";
import AlertCircleIcon from "@repo/ui/assets/icons/AlertCircleIcon";

export const additionalInfoOptions = [
  {
    value: "additional",
    label: (
      <h1 className="text-oxford-blue-300">
        {
          <div className="flex items-center">
            <QuestionIcon className="mr-[5px]" size={"20"} />
            Additional Info text
          </div>
        }
      </h1>
    ),
  },
  {
    value: "missing",
    label: (
      <h1 className="text-oxford-blue-300">
        {
          <div className="flex items-center">
            <MissingIcon className="mr-[5px]" />
            Missing
          </div>
        }
      </h1>
    ),
  },
  {
    value: "is_dangerous",
    label: (
      <h1 className="text-oxford-blue-300">
        {
          <div className="flex items-center">
            <AlertCircleIcon size={"18"} className="mr-[5px]" />
            Dangerous
          </div>
        }
      </h1>
    ),
  },
];
