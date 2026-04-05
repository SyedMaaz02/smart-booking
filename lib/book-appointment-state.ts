export type BookAppointmentState = {
  ok: boolean;
  message: string;
};

export const bookAppointmentInitialState: BookAppointmentState = {
  ok: false,
  message: "",
};
