export type AccuweatherCurrentConditions = AccuweatherCurrentConditionsData[];

interface AccuweatherCurrentConditionsData {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: null;
  IsDayTime: boolean;
  Temperature: ApparentTemperature;
  RealFeelTemperature: ApparentTemperature;
  RealFeelTemperatureShade: ApparentTemperature;
  RelativeHumidity: number;
  IndoorRelativeHumidity: number;
  DewPoint: ApparentTemperature;
  Wind: Wind;
  WindGust: WindGust;
  UVIndex: number;
  UVIndexText: string;
  Visibility: ApparentTemperature;
  ObstructionsToVisibility: string;
  CloudCover: number;
  Ceiling: ApparentTemperature;
  Pressure: ApparentTemperature;
  PressureTendency: PressureTendency;
  Past24HourTemperatureDeparture: ApparentTemperature;
  ApparentTemperature: ApparentTemperature;
  WindChillTemperature: ApparentTemperature;
  WetBulbTemperature: ApparentTemperature;
  Precip1hr: ApparentTemperature;
  PrecipitationSummary: { [key: string]: ApparentTemperature };
  TemperatureSummary: TemperatureSummary;
  MobileLink: string;
  Link: string;
}

interface ApparentTemperature {
  Metric: Imperial;
  Imperial: Imperial;
}

interface Imperial {
  Value: number;
  Unit: string;
  UnitType: number;
  Phrase?: string;
}

interface PressureTendency {
  LocalizedText: string;
  Code: string;
}

interface TemperatureSummary {
  Past6HourRange: PastHourRange;
  Past12HourRange: PastHourRange;
  Past24HourRange: PastHourRange;
}

interface PastHourRange {
  Minimum: ApparentTemperature;
  Maximum: ApparentTemperature;
}

interface Wind {
  Direction: Direction;
  Speed: ApparentTemperature;
}

interface Direction {
  Degrees: number;
  Localized: string;
  English: string;
}

interface WindGust {
  Speed: ApparentTemperature;
}
