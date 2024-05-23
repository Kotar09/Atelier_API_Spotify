import mysql.connector
import time

start_time = time.time()

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="spotify"
)

if conn.is_connected():
    print("Connexion à la base de données réussie.")
else:
    print("La connexion à la base de données a échoué.")

cursor = conn.cursor()

tables = ["Playlist_Contient_Track", "Tracks", "Albums", "Artists", "Playlists"]

cursor.execute("SET FOREIGN_KEY_CHECKS = 0")

for table in tables:
    cursor.execute(f"DELETE FROM {table}")
    conn.commit()
    print(f"Table {table} vidée avec succès.")

cursor.execute("SET FOREIGN_KEY_CHECKS = 1")

cursor.close()
conn.close()

end_time = time.time()
elapsed_time = end_time - start_time
print(f"Temps écoulé: {elapsed_time} secondes.")
print("Vidage de la base de données terminé avec succès !")
