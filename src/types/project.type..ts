import People from "./people.type";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  videoUrl: string;
  brand: string;
  productionCompany: string;
  execusiveProducer: string;
  director: People[];
};

export default Project;