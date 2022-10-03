import StreetViewGEMap from '../StreetView_ST/StreetView_ST';
import { useLoadScript } from '@react-google-maps/api';
import { Googlemap_key } from '../../../../utils/config';

const CommunityGooglemap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: Googlemap_key,
    libraries: ['places'],
  });
  if (!isLoaded) return <div>Loading...!</div>;
  return <StreetViewGEMap />;
};
export default CommunityGooglemap;
