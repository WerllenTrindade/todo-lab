export enum PRIORITY {
  BAIXA = "baixa",
  MEDIA = "media",
  ALTA = "alta",
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

export type PriorityValue = typeof PRIORITYS[number]["value"];
export const PRIORITY_VALUES: [PriorityValue, ...PriorityValue[]] = [
  PRIORITYS[0].value,
  ...PRIORITYS.slice(1).map((p) => p.value),
];
