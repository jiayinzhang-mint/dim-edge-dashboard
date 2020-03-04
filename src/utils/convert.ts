export const mapToList = (map: any) => {
  const list = [];
  for (const key in map) {
    if (map[key]) {
      const e = map[key];
      list.push({
        text: key,
        value: e
      });
    }
  }

  return list;
};
