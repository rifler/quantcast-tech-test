import {getTimestamp} from '@/utils/date';
import {generateRandomInteger} from '@/utils/random';

export function generateFpa() {
  return `P0-${generateRandomInteger(1_000_000_000, 9_999_999_999)}-${getTimestamp()}`;
}
