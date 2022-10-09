export interface AccuweatherForecast {
  Headline: Headline;
  DailyForecasts: AccuweatherForecast_DailyForecast[];
}

interface Headline {
  EffectiveDate: string;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: string;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
}

export interface AccuweatherForecast_DailyForecast {
  Date: string;
  EpochDate: number;
  Sun: Sun;
  Moon: Moon;
  Temperature: RealFeelTemperature;
  RealFeelTemperature: RealFeelTemperature;
  RealFeelTemperatureShade: RealFeelTemperature;
  HoursOfSun: number;
  DegreeDaySummary: DegreeDaySummary;
  AirAndPollen: AirAndPollen[];
  Day: Day;
  Night: Day;
  Sources: string[];
  MobileLink: string;
  Link: string;
}

interface AirAndPollen {
  Name: string;
  Value: number;
  Category: string;
  CategoryValue: number;
  Type?: string;
}

interface Day {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string;
  PrecipitationIntensity?: string;
  ShortPhrase: string;
  LongPhrase: string;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  RainProbability: number;
  SnowProbability: number;
  IceProbability: number;
  Wind: Wind;
  WindGust: Wind;
  TotalLiquid: Evapotranspiration;
  Rain: Evapotranspiration;
  Snow: Evapotranspiration;
  Ice: Evapotranspiration;
  HoursOfPrecipitation: number;
  HoursOfRain: number;
  HoursOfSnow: number;
  HoursOfIce: number;
  CloudCover: number;
  Evapotranspiration: Evapotranspiration;
  SolarIrradiance: Evapotranspiration;
}

interface Evapotranspiration {
  Value: number;
  Unit: string;
  UnitType: number;
  Phrase?: string;
}

interface Wind {
  Speed: Evapotranspiration;
  Direction: Direction;
}

interface Direction {
  Degrees: number;
  Localized: string;
  English: string;
}

interface DegreeDaySummary {
  Heating: Evapotranspiration;
  Cooling: Evapotranspiration;
}

interface Moon {
  Rise: string;
  EpochRise: number;
  Set: string;
  EpochSet: number;
  Phase: string;
  Age: number;
}

interface RealFeelTemperature {
  Minimum: Evapotranspiration;
  Maximum: Evapotranspiration;
}

interface Sun {
  Rise: string;
  EpochRise: number;
  Set: string;
  EpochSet: number;
}
