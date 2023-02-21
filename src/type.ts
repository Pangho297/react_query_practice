export type PostResType = {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
};

export type InputType = {
  title: string;
  body: string;
};

export type PayloadType = InputType & { userId: number };
