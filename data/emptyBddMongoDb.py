import pymongo
import time

start_time = time.time()

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["spotify"]

if client:
    print("Connexion à la base de données réussie.")
else:
    print("La connexion à la base de données a échoué.")

collections = ["Playlist_Contient_Track", "Tracks", "Albums", "Artists", "Playlists"]

for collection_name in collections:
    collection = db[collection_name]
    collection.delete_many({})
    print(f"Collection {collection_name} vidée avec succès.")

client.close()

end_time = time.time()
elapsed_time = end_time - start_time
print(f"Temps écoulé: {elapsed_time} secondes.")
print("Vidage de la base de données terminé avec succès !")
