export class Setup {
  username!: string;
  password!: string;
  org!: string;
  bucket!: string;
  retentionPeriodHrs!: number;
}

export class SignIn {
  username!: string;
  password!: string;
}

export class RetentionRules {
  type!: string;
  everySeconds!: number;
}

export class Bucket {
  id!: string;
  type!: string;
  name!: string;
  description!: string;
  createdAt!: string;
  updatedAt!: string;
  retentionRules?: RetentionRules[];
}

export class Record {
  time!: {
    seconds: number;
    nanos: number;
  };
  count!: number;
}
