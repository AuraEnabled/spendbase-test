import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsArrayUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isArrayUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string[]) {
          if (!Array.isArray(value)) return false;
          return new Set(value).size === value.length;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must not contain duplicate values`;
        },
      },
    });
  };
}
