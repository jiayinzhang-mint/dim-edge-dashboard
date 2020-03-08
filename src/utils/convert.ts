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

export const cpuUsage = (v: string) => {
  return (Number(v.slice(0, -1)) / 1000000).toFixed(2);
};

export const memUsage = (v: string) => {
  return (Number(v.slice(0, -2)) / 1000).toFixed(2);
};
