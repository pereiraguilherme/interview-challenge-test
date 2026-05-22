package models

type Country struct {
	Name struct {
		Common   string `json:"common"`
		Official string `json:"official"`
	} `json:"name"`
	CCA3       string   `json:"cca3"`
	Capital    []string `json:"capital"`
	Region     string   `json:"region"`
	Subregion  string   `json:"subregion"`
	Population int64    `json:"population"`
	Area       float64  `json:"area"`
	Flags      struct {
		PNG string `json:"png"`
		SVG string `json:"svg"`
	} `json:"flags"`
	Languages  map[string]string            `json:"languages"`
	Currencies map[string]map[string]string `json:"currencies"`
}

type CountryStats struct {
	TotalCountries  int `json:"totalCountries"`
	TotalPopulation int64 `json:"totalPopulation"`
	LargestCountry  struct {
		Name string  `json:"name"`
		Area float64 `json:"area"`
	} `json:"largestCountry"`
	MostPopulous struct {
		Name       string `json:"name"`
		Population int64  `json:"population"`
	} `json:"mostPopulous"`
}

type RegionData struct {
	Region     string   `json:"region"`
	Count      int      `json:"count"`
	Population int64    `json:"population"`
	Countries  []string `json:"countries"`
}
