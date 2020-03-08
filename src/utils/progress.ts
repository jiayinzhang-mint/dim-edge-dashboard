export const loadProgress = (v: number) => {
  if (v < 50) {
    return 'primary';
  } else if (v >= 50 && v < 85) {
    return 'warning lighten-2';
  } else if (v >= 85) {
    return 'error';
  }
};
