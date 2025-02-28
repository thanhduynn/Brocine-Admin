import { ICON_PATHS } from "@/constants/icons";

interface SocialLink {
  id: string;
  platform: keyof typeof ICON_PATHS;
  url: string;
};

export default SocialLink;