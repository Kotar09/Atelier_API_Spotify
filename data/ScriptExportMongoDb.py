import os
import json
import pymongo
import time
from concurrent.futures import ThreadPoolExecutor

start_time = time.time()

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["spotify"]

if client:
    print("Connexion à la base de données réussie.")
else:
    print("La connexion à la base de données a échoué.")

data_folder = "data/data/"
file_list = [f for f in os.listdir(data_folder) if os.path.isfile(os.path.join(data_folder, f))]

batch_size = 10

def process_file(file_name):
    with open(os.path.join(data_folder, file_name)) as json_file:
        data = json.load(json_file)
        local_playlists_data = []
        local_artists_data = []
        local_albums_data = []
        local_tracks_data = []
        local_playlist_tracks_data = []

        for playlist in data['playlists']:
            pid = playlist['pid']
            name = playlist['name']
            collaborative = True if playlist['collaborative'] == 'true' else False
            num_tracks = playlist['num_tracks']
            num_albums = playlist['num_albums']
            num_followers = playlist['num_followers']
            modified_at = playlist['modified_at']

            local_playlists_data.append({
                "pid": pid,
                "name": name,
                "collaborative": collaborative,
                "num_tracks": num_tracks,
                "num_albums": num_albums,
                "num_followers": num_followers,
                "modified_at": modified_at
            })

            for track in playlist['tracks']:
                track_uri = track.get('track_uri')
                track_pos = track.get('pos')
                album_name = track.get('album_name')
                album_uri = track.get('album_uri')
                artist_uri = track.get('artist_uri')
                artist_name = track.get('artist_name')
                track_name = track.get('track_name')
                duration_ms = track.get('duration_ms')

                local_artists_data.append({
                    "artist_uri": artist_uri,
                    "artist_name": artist_name
                })
                local_albums_data.append({
                    "album_uri": album_uri,
                    "album_name": album_name,
                    "artist_uri": artist_uri
                })
                local_tracks_data.append({
                    "track_uri": track_uri,
                    "track_name": track_name,
                    "duration_ms": duration_ms,
                    "album_uri": album_uri
                })
                local_playlist_tracks_data.append({
                    "pid": pid,
                    "track_uri": track_uri,
                    "pos": track_pos
                })

    return (local_playlists_data, local_artists_data, local_albums_data, local_tracks_data, local_playlist_tracks_data)

def bulk_insert(collection, data):
    if data:
        collection.insert_many(data)

def process_batch(files):
    global playlists_data, artists_data, albums_data, tracks_data, playlist_tracks_data
    with ThreadPoolExecutor() as executor:
        results = executor.map(process_file, files)

    for result in results:
        playlists_data.extend(result[0])
        artists_data.extend(result[1])
        albums_data.extend(result[2])
        tracks_data.extend(result[3])
        playlist_tracks_data.extend(result[4])

    bulk_insert(db["Playlists"], playlists_data)
    bulk_insert(db["Artists"], artists_data)
    bulk_insert(db["Albums"], albums_data)
    bulk_insert(db["Tracks"], tracks_data)
    bulk_insert(db["Playlist_Contient_Track"], playlist_tracks_data)

    playlists_data = []
    artists_data = []
    albums_data = []
    tracks_data = []
    playlist_tracks_data = []

playlists_data = []
artists_data = []
albums_data = []
tracks_data = []
playlist_tracks_data = []

for i in range(0, len(file_list), batch_size):
    process_batch(file_list[i:i + batch_size])

bulk_insert(db["Playlists"], playlists_data)
bulk_insert(db["Artists"], artists_data)
bulk_insert(db["Albums"], albums_data)
bulk_insert(db["Tracks"], tracks_data)
bulk_insert(db["Playlist_Contient_Track"], playlist_tracks_data)

end_time = time.time()
elapsed_time = end_time - start_time
print(f"Temps écoulé: {elapsed_time} secondes.")
print("Importation de tous les fichiers terminée avec succès !")

client.close()
