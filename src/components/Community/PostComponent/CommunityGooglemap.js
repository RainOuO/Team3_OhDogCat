import PostMap from './PostMap';
import { useLoadScript } from '@react-google-maps/api';
// import { Googlemap_key } from '../../utils/config';
import { Googlemap_key } from '../../../utils/config';

import { useLocation } from 'react-router-dom';

const CommunityGooglemap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: Googlemap_key,
    libraries: ['places'],
  });
  if (!isLoaded) return <div>Loading...!</div>;
  return <PostMap />;
};
export default CommunityGooglemap;
