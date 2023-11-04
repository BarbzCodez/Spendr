-- AddForeignKey
ALTER TABLE "GroupExpenseSplit" ADD CONSTRAINT "GroupExpenseSplit_groupExpenseId_fkey" FOREIGN KEY ("groupExpenseId") REFERENCES "GroupExpense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
