from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from ..utils.auth import verify_access_token # Assuming you have a verify_access_token function

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token") # "token" is a placeholder, actual URL depends on your setup

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user_id = verify_access_token(token, credentials_exception)
    # In a real app, you would fetch the user from the database here
    # For now, we just return the user_id
    return user_id
