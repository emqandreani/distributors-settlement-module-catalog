interface IPriceBookStates {
  [index: string]: string;
}

export const PRICEBOOKS_STATES: IPriceBookStates = {
  ACTIVE: "Vigente",
  DRAFT: "Borrador",
  CONSOLIDATED: "Consolidado",
  UNCONSOLIDATED: "No consolidado",
  EXPIRED: "Vencido",
};
