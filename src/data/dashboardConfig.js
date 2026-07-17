export const dashboardConfig = [
  {
    id: "water_extent",
    title: "Water Extent & Wetland",
    accent: "cyan",
    description: "Open water and wetland boundary mapping from multispectral band ratios.",
    parameters: [
      { id: "ndwi", name: "NDWI", fullName: "Normalized Difference Water Index", purpose: "Surface water extraction", seriesKey: "ndwi" },
      { id: "mndwi", name: "MNDWI", fullName: "Modified NDWI", purpose: "Wetland & turbid water mapping", seriesKey: "mndwi" },
      { id: "awei", name: "AWEI", fullName: "Automated Water Extraction Index", purpose: "Shadow-resistant water classification", seriesKey: "awei" },
      { id: "water_extent", name: "Water Extent", fullName: "Total Open-Water Area", purpose: "Seasonal lagoon area tracking", seriesKey: "water_extent_sqkm" }
    ]
  },
  {
    id: "water_quality",
    title: "Water Quality",
    accent: "teal",
    description: "Chlorophyll, turbidity, and suspended sediment indicators for lagoon health.",
    parameters: [
      { id: "ndci", name: "NDCI", fullName: "Normalized Difference Chlorophyll Index", purpose: "Chlorophyll-a / algal bloom estimation", seriesKey: "ndci" },
      { id: "turbidity", name: "Turbidity", fullName: "Turbidity Index", purpose: "Water clarity assessment", seriesKey: "turbidity_ntu" },
      { id: "tsm", name: "TSM", fullName: "Total Suspended Matter", purpose: "Sediment load estimation", seriesKey: "tsm_mg_l" }
    ]
  },
  {
    id: "salinity",
    title: "Salinity Gradient",
    accent: "amber",
    description: "Marine-to-freshwater salinity gradient, a defining feature of Chilika's ecology.",
    parameters: [
      { id: "salinity", name: "Salinity", fullName: "Salinity (ppt)", purpose: "Marine–freshwater gradient tracking", seriesKey: "salinity_ppt" }
    ]
  },
  {
    id: "shoreline",
    title: "Shoreline Change",
    accent: "coral",
    description: "DSAS transect-based erosion and accretion analysis across lagoon sectors.",
    isMapDriven: true,
    parameters: [
      { id: "shoreline_transects", name: "DSAS Transects", fullName: "Digital Shoreline Analysis System", purpose: "Erosion / accretion rate by transect" }
    ]
  },
  {
    id: "vegetation_land",
    title: "Vegetation & Land",
    accent: "teal",
    description: "Catchment vegetation vigor and built-up encroachment around the lagoon periphery.",
    parameters: [
      { id: "ndvi", name: "NDVI", fullName: "Normalized Difference Vegetation Index", purpose: "Catchment vegetation health", seriesKey: "ndvi_catchment" },
      { id: "ndbi", name: "NDBI", fullName: "Normalized Difference Built-up Index", purpose: "Periphery built-up encroachment", seriesKey: "ndbi_periphery" }
    ]
  },
  {
    id: "thermal",
    title: "Thermal",
    accent: "coral",
    description: "Surface temperature patterns across the lagoon and catchment.",
    parameters: [
      { id: "lst", name: "LST", fullName: "Land Surface Temperature", purpose: "Surface thermal regime", seriesKey: "lst_mean_c" }
    ]
  },
  {
    id: "ml_classification",
    title: "ML Classification",
    accent: "cyan",
    description: "Supervised classification models trained on index stacks for LULC and water-quality prediction.",
    isModelPanel: true,
    parameters: [
      { id: "lulc_rf", name: "LULC — Random Forest", fullName: "Random Forest LULC Classification", purpose: "Wetland / water / vegetation / built-up classes", accuracy: 0.91 },
      { id: "wq_gbm", name: "Water Quality — Gradient Boosting", fullName: "Chlorophyll & Turbidity Prediction", purpose: "Predicts water quality from index stack", accuracy: 0.84 }
    ]
  }
];
