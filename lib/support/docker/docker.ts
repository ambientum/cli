// import base docker client.
import Dockerode from "dockerode";

// export Docker client instance.
export const docker = new Dockerode();

// default alias export.
export default docker;
