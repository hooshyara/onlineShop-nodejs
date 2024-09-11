import jwt from "jsonwebtoken";


export async function get_user(token) {
    try {
        const JWT_SECRET = "66d26fd51c6c4e50b6ba3094715c740feaafded2fd4bdccf492c30bf062ca20fc963c243fcf926ac031049bdce45fe638a44696959e5853826a58219c2057ea3";
        const decodedToken = jwt.verify(token, JWT_SECRET);
        console.log(decodedToken.user.id)

      } catch (error) {
        console.error(error);
      }
}
