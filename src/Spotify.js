const Spotify = {
    clientID: '951840e669584aef8c3f90f69aaa2ff1',
    redirectUri: 'localhost:3000',
    search: async (term) => 
    {
        //const accessToken = Spotify.getAccessToken();
        const apiUrl = 'https://api.spotify.com/v1search?type=track&q=${term}';
        const headers = {
           // Authorizations: `Bearer ${accessToken}`,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers,
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.tracks) {
                    return jsonResponse.tracks.items.map((track) => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        uri: track.uri
                    }));

                }
                return [];
            }
        } catch (error) {
            console.error('Sorry! Error while searching for tracks:', error);
        }
    },
    getUserID: async () =>
    {
        //const accessToken=Spotify.getAccessToken();
        const apiUrl='https:/api.spotify.com/v1/me';
        const headers={
            //Authorization: `Bearer ${accessToken}`,
        };
        
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers,

            });

            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.id;
            }
        } catch (error) {
            console.error('Sorry! There was an error fetching user ID:', error);
        }
    },
    createPlaylist: async (userID, playlistName) => {
        //const accessToken = Spotify.getAccessToken();
        const apiUrl='https://api.spotify.com/v1/users/${userID}/playlists';
        const headers = {
           // Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',

        };
        const data =JSON.stringify({
            name: playlistName,
            description: 'This playlist was created with Jam'
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: data,
            });

            if(response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.id;
            }
        } catch (error) {
            console.error('Uhoh! There was an error creating the playlist:', error);
        }
    },
    addTracksToPlaylist: async (userID, playlistID, trackURIs) => {
       // const accessToken = Spotify.getAccessToken();
        const apiUrl = 'http://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks';
        const headers = {
            //Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',

        };
        const data = JSON.stringify({
            uris: trackURIs,
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST', headers: headers,
                body: data,

            });

            if (response.ok) {
                console.log("tracks added to your playlist!");
            }
        } catch (error) {
            console.error("Uhoh! There was an error adding the tracks to your playlist:", error);
        }
    },
};

Spotify.getAccessToken = () => {
    //is access token already in url
    const access_token = 1234;
    const expires_in = 1234;
    const accessTokenMatch = window.location.href.match(access_token);
    const expiresInMatch = window.location.href.match(expires_in);

    if (accessTokenMatch && expiresInMatch) {
        const accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);

        //clear parameters from url so no expired tokens
        window.setTimeout(() => {
            window.history.pushState('Access Token', null, '/');
        }, expiresIn * 2000);

        return accessToken;
    } else {
        const redirectURL ='https://accounts.spotify.com/authorize?client_id=${Spotify.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${Spotify.redirectUri}';
        window.location.href = redirectURL;
    }
}; 

export default Spotify;