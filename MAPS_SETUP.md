# Maps & Geocoding Setup - Methynix Meet

**100% Free - No API Keys Required**

## Technology Stack

### Frontend Maps
- **MapLibre GL** (v4.0.0) - Open-source map rendering
- **react-map-gl** (v7.1.7) - React wrapper for MapLibre
- **OpenStreetMap** - Free tile provider

### Geocoding
- **Nominatim (OpenStreetMap)** - Free reverse & forward geocoding
- **No API keys needed**
- **Rate limited but suitable for development**

## Features

### Map Display
✅ Interactive maps using MapLibre GL
✅ OpenStreetMap tiles (free)
✅ Fullscreen control
✅ Navigation controls (zoom, pan)
✅ Click to select location
✅ Custom markers

### Geocoding
✅ Reverse geocoding: Coordinates → Address
✅ Forward geocoding: Address → Coordinates
✅ City detection from coordinates
✅ Address search functionality

### User Experience
✅ Search bar to find addresses
✅ Click map to select location
✅ Real-time location display
✅ City and address information
✅ Smooth map animations

## Components

### MapPicker Component
**Location:** `client/src/components/MapPicker.jsx`

Features:
- Interactive map with OpenStreetMap tiles
- Search functionality using Nominatim
- Click-to-select location
- Marker display
- Address and city display
- Responsive design

**Usage:**
```jsx
import MapPicker from '../components/MapPicker';

<MapPicker
  initialCoords={{ lat: 40.7128, lng: -74.0060 }}
  onLocationSelect={(location) => {
    console.log(location);
    // {
    //   lat: 40.7128,
    //   lng: -74.0060,
    //   address: "123 Main St, New York, NY 10001",
    //   city: "New York"
    // }
  }}
/>
```

### Geocoding Service
**Location:** `client/src/services/geocodingService.js`

Methods:

#### 1. Reverse Geocoding
```javascript
const location = await geocodingService.reverseGeocode(40.7128, -74.0060);
// Returns: { address, city, country, latitude, longitude }
```

#### 2. Forward Geocoding
```javascript
const location = await geocodingService.forwardGeocode("New York, NY");
// Returns: { address, city, country, latitude, longitude }
```

#### 3. Get City
```javascript
const city = await geocodingService.getCity(40.7128, -74.0060);
// Returns: "New York"
```

## Installation

### 1. Install Dependencies
```bash
cd client
npm install maplibre-gl react-map-gl
```

### 2. Import CSS
The MapLibre CSS is automatically imported in the MapPicker component:
```javascript
import 'maplibre-gl/dist/maplibre-gl.css';
```

### 3. Update Environment (Optional)

Add to `.env` if using custom tile providers:
```env
VITE_MAP_STYLE_URL=https://demotiles.maplibre.org/style.json
VITE_NOMINATIM_API=https://nominatim.openstreetmap.org
```

## Styling

### CSS Classes
The MapPicker component uses Tailwind CSS classes:
- Container: `rounded-lg border border-glass-border`
- Map height: `h-[300px]`
- Marker: `w-8 h-8 bg-neon-cyan rounded-full`
- Info box: `holo-card p-4 bg-neon-cyan/5`

### Custom Marker Styling
Current marker:
- Color: Neon Cyan
- Border: Neon Purple
- Size: 32x32px
- Shadow: lg
- Hover effect: scale-110

To customize, edit the marker element in `MapPicker.jsx`:
```javascript
const el = document.createElement('div');
el.className = 'w-8 h-8 bg-neon-cyan rounded-full border-2 border-neon-purple shadow-lg';
```

## Tile Providers

### Current: OpenStreetMap (Demotiles)
```
https://demotiles.maplibre.org/style.json
```

Free and open-source. Great for development and production.

### Alternative Free Providers

1. **OpenStreetMap Bright**
```
https://openmaptiles.github.io/positron-gl-style/style-cdn.json
```

2. **USGS Topo**
```
https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}
```

3. **Stadia Maps** (requires free account)
```
https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png
```

To change, update the `style` property in MapPicker.jsx:
```javascript
map.current = new maplibregl.Map({
  style: 'https://your-tile-provider.com/style.json'
});
```

## Geocoding API

### Nominatim (OpenStreetMap)
- **Base URL:** `https://nominatim.openstreetmap.org`
- **Rate Limit:** 1 request per second
- **User-Agent:** Required and set to "MethynixMeet/1.0"
- **Free:** Yes, completely free

### Usage in Code

**Reverse Geocoding:**
```
GET https://nominatim.openstreetmap.org/reverse?format=json&lat=40.7128&lon=-74.0060
```

**Forward Geocoding:**
```
GET https://nominatim.openstreetmap.org/search?format=json&q=New+York&limit=1
```

### Response Example
```json
{
  "place_id": 123456,
  "display_name": "123 Main Street, New York, NY 10001, United States",
  "lat": "40.7128",
  "lon": "-74.0060",
  "address": {
    "road": "Main Street",
    "city": "New York",
    "state": "New York",
    "country": "United States"
  }
}
```

## Features in Methynix Meet

### Create Event Page
- Interactive map to select event location
- Address search functionality
- City detection
- Automatic center on user location
- Click-to-select from map

### Dashboard Events
- Event locations displayed on map
- Marker clusters for multiple events
- Click event marker for details

### Location Permission
- Requests user's geolocation
- Falls back to default coordinates if denied
- User can override with manual search

## Performance

### Optimization Tips

1. **Lazy Load Maps**
```javascript
const MapPicker = lazy(() => import('./MapPicker'));
```

2. **Cache Geocoding Results**
Store addresses in component state to avoid repeated API calls

3. **Debounce Search**
Wait for user to stop typing before geocoding:
```javascript
const debouncedSearch = debounce(handleSearch, 500);
```

4. **Limit Tile Provider Requests**
MapLibre automatically optimizes tile loading

## Troubleshooting

### Map Not Showing
- Ensure `mapContainer` ref is attached to DOM element
- Check console for errors
- Verify CSS is imported
- Check map height (must have explicit height)

### Geocoding Not Working
- Check user-agent header
- Verify API rate limit (1 req/sec)
- Ensure coordinates are in valid range
- Check browser console for CORS issues

### Slow Performance
- Reduce map zoom animations
- Cache geocoding results
- Use debouncing for search
- Monitor network tab for tile loading

### CORS Issues
- Nominatim allows cross-origin requests
- Ensure User-Agent header is set
- If issues persist, use a CORS proxy (not recommended for production)

## Security

### API Keys
- ✅ No API keys needed
- ✅ No secrets to expose
- ✅ Rate limited but suitable for production
- ✅ Open-source components

### Data Privacy
- Map tiles are cached locally
- Geocoding requests use OSM Nominatim
- User coordinates stored in app state
- No third-party tracking

### Rate Limiting
For production, consider:
1. Server-side geocoding proxy
2. Caching geocoding results
3. Nominatim's paid plans for higher limits

## Future Enhancements

### Planned Features
- [ ] Multiple markers on map
- [ ] Route drawing between events
- [ ] Event clustering
- [ ] Heatmap visualization
- [ ] Directions API integration
- [ ] Distance calculations

### Optional Additions
- Mapbox GL (requires API key)
- Tangram for 3D maps
- Deck.gl for large datasets
- Mapillary street view

## Resources

- **MapLibre GL:** https://maplibre.org
- **OpenStreetMap:** https://openstreetmap.org
- **Nominatim:** https://nominatim.org
- **OSM Tiles:** https://wiki.openstreetmap.org/wiki/Tiles

## Support

Issues with maps?
- 📧 info@methynix.com
- 📞 0715455422
- GitHub Issues

---

**100% Free & Open Source** ✨
Built with MapLibre, OpenStreetMap, and Nominatim
