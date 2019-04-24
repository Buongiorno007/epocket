export const DISTANCE_UPDATE = "distance/DISTANCE_UPDATE";

export default (state = null, action) => {
  switch (action.type) {
    case DISTANCE_UPDATE:
      return action.distance;
    default:
      return state;
  }
};

export const setDistance = distance => ({
  type: DISTANCE_UPDATE,
  distance
});
