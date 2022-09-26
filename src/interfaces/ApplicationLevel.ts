export interface IApplicationLevel {
  id: string;
  name: string;
  parentApplicationLevelId: null | string;
  applicationLevelTreeJson: string;
  applicationLevelTreeUrl: string;
  applicationLevelTypeName: ApplicationLevelTypeName;
}

export enum ApplicationLevelTypeName {
  Country = "Country",
  Distributor = "Distributor",
  Location = "Location",
  Vehicle = "Vehicle",
  Zone = "Zone",
}
