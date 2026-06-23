export type user = {
	name?: string;
	email?: string;
	password?: string;
	isAdmin?: boolean;
};

export type userResponse = {
	id: number;
	name: string;
	email: string;
}[];

export type userErrorResponse = {
	success: boolean;
	error: string;
};