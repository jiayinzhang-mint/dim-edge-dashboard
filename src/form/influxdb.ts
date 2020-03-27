export const setupForm = [
  {
    type: 'text-field',
    title: 'Username',
    name: 'username',
    rules: [(v: string) => !!v || ''],
  },
  {
    type: 'text-field',
    name: 'password',
    title: 'Password',
    inputType: 'password',
    rules: [(v: string) => !!v || ''],
  },
  {
    type: 'text-field',
    title: 'Organization',
    name: 'org',
    rules: [(v: string) => !!v || ''],
  },
  {
    type: 'text-field',
    title: 'Bucket',
    name: 'bucket',
    rules: [(v: string) => !!v || ''],
  },
  {
    type: 'text-field',
    title: 'retentionPeriodHrs',
    name: 'retentionPeriodHrs',
    inputType: 'number',
    rules: [(v: number) => !!v || ''],
  },
];

export const signInForm = [
  {
    type: 'text-field',
    title: 'Username',
    name: 'username',
    rules: [(v: string) => !!v || ''],
  },
  {
    type: 'text-field',
    name: 'password',
    title: 'Password',
    inputType: 'password',
    rules: [(v: string) => !!v || ''],
  },
];
