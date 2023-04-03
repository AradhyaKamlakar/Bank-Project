﻿using Bank.Model;

namespace Bank.Interfaces
{
    public interface IToken
    {
        ICollection<Token> GetTokens();

        public bool CreateToken(int UserId, int ServiceId);
    }
}