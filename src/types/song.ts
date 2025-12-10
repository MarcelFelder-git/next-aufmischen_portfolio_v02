export interface Song {
	_id: string;
	title: string;
	artist: string;
	roles: string[];
	cover?: string;
	audio?: { asset: { url: string } };
}
