import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export class UuidValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!uuidRegex.test(value)) {
      throw new BadRequestException('Parameter is not a valid UUID');
    }

    return value;
  }
}