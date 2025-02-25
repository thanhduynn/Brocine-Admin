import { ICON_PATHS } from "@/constants/icons";

interface SocialLink {
  platform: keyof typeof ICON_PATHS,
  url: string,
};

export default SocialLink;