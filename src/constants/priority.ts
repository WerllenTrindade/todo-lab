export enum PRIORITY {
  ALTA = "alta",
  MEDIA = "media",
  BAIXA = "baixa",
}

export type PriorityOption = {
  label: string;
  value: PRIORITY;
};

export const PRIORITYS = [
  { label: "Baixa", value: PRIORITY.BAIXA },
  { label: "Média", value: PRIORITY.MEDIA },
  { label: "Alta", value: PRIORITY.ALTA },
];