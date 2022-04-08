/**
 * 뮨자열 hash code 반환
 */
export function hashCode(str: string): number {
  const len = str.length;
  let hash = 0;

  if (!len) {
    return hash;
  }

  let i = 0;

  while (i < len) {
    hash = ((hash << 5) - hash + str.charCodeAt(i++)) | 0;
  }

  return hash;
}
