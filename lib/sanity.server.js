import { createClient } from "next-sanity";
import { config } from "./config";

export const sanityClient = createClient(config);
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token:
    "skmUt1WpRM7C1rTMu0WbjuZ3kVWAGSbjhLx2KYRiBtoTEUzzzx7fwZWMgTvIaR8HRiHvvp85Pz7VvrRNUvEOSIJ35SDQrLszspsvgIuEYHkfCurXZtOcUQreCzEI0HVZGNrgoFvNv89hexS2Fqi0fu5X85ksGoFXXkxYc8C5N9dgYm77fpuj",
});
export const getClient = (usePreview) => (usePreview ? previewClient : sanityClient);
