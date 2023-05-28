# Osmosis
[Osmosis](https://wiki.openstreetmap.org/wiki/Osmosis) is a memory efficient tool for parsing different formats of OSM files.

Example command to extract road network (car) from pbf file and save it into xml file (`poland-latest.osm.pbf` can be downlaoded from [Geofabrik](https://download.geofabrik.de/europe/poland.html)):
```shell
osmosis \
    --read-pbf poland-latest.osm.pbf \
    --tf accept-ways 'highway=motorway,motorway_link,trunk,trunk_link,primary,primary_link,secondary,secondary_link,tertiary,tertiary_link,unclassified,residential' \
    --tf reject-relations \
    --used-node \
    --write-xml poland-latest-filtered.xml
```
