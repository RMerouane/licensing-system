import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'uniqueChars', async: false })
export class UniqueCharsConstraint implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    return new Set(value).size >= 12;
  }

  defaultMessage(_arg: ValidationArguments): string {
    return 'Password must have at least 12 diffrent characters';
  }
}

export function UniqueChars(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'uniqueChars',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueCharsConstraint,
    });
  };
}
