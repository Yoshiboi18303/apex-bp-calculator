import prompts from "prompts";
import { red } from "kleur/colors";

const validationFunction = (value: number) => {
  if (value < 1) return "Value can't be lower than 1!";
  else if (value > 110) return "Value can't be greater than 110!";
  else return true;
};

const starValidator = (value: number) => {
  if (value < 0) return "Stars can't be negative";
  else if (value > 10) return "Stars can't exceed 10";
  else return true;
};

const onCancel = () => {
  console.log(red("Prompting cancelled."));
  process.exit(0);
};

export function calculate(current: number, goal: number, extraStars: number) {
  const currentIsValid = validationFunction(current);
  const goalIsValid = validationFunction(goal);
  const starsAreValid = starValidator(extraStars);

  // Validations
  if (currentIsValid != true) throw new Error(red(currentIsValid));

  if (goalIsValid != true) throw new Error(red(goalIsValid));

  if (starsAreValid != true) throw new Error(red(starsAreValid));

  // Math
  const currentStars = current * 10 + extraStars;
  const goalStars = goal * 10;

  return goalStars - currentStars;
}

export async function getPrompts(argv: any) {
  // Override some or most of the prompts if the options are specified.
  prompts.override(argv);

  // Make the prompts
  const answers = await prompts(
    [
      {
        type: "number",
        name: "current-level",
        message: "Please enter your current battle pass level",
        validate: validationFunction,
      },
      {
        type: "number",
        name: "goal-level",
        message: "Please enter what your battle pass level goal is",
        validate: validationFunction,
      },
      {
        type: "number",
        name: "extraStars",
        message:
          "Please enter how many extra stars you have in your current level (0 if none)",
        initial: 0,
        validate: starValidator,
      },
    ],
    {
      onCancel,
    }
  );

  return answers;
}
