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
  const suffix = v.slice(-1);
  if (suffix == 'n') {
    return (Number(v.slice(0, -1)) / 1000000).toFixed(2);
  } else if (suffix == 'm') {
    return Number(v.slice(0, -1)).toFixed(2);
  } else {
    return '0.00';
  }
};

export const memUsage = (v: string) => {
  const suffix = v.slice(-2);
  if (suffix == 'Ki') {
    return (Number(v.slice(0, -2)) / 1000).toFixed(2);
  } else if (suffix == 'Mi') {
    return Number(v.slice(0, -2)).toFixed(2);
  } else {
    return '0.00';
  }
};
