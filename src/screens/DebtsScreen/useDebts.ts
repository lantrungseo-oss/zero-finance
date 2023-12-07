import {useDispatch, useSelector} from 'react-redux';
import useThemeColors from '../../hooks/useThemeColors';
import {selectDebtorData} from '../../redux/slice/debtorDataSlice';
import {
  getAllDebtRequest,
  selectAllDebtData,
} from '../../redux/slice/allDebtDataSlice';
import {useEffect, useState} from 'react';
import {selectCurrencySymbol} from '../../redux/slice/currencyDataSlice';
import {FETCH_ALL_DEBTOR_DATA} from '../../redux/actionTypes';

const useDebts = () => {
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const debtors = useSelector(selectDebtorData);
  const allDebts = useSelector(selectAllDebtData);
  const allDebtsCopy = JSON.parse(JSON.stringify(allDebts));
  const [debtorType, setDebtorType] = useState('Person');
  console.log('this is all debts copy', debtors);
  console.log(debtors);
  const currencySymbol = useSelector(selectCurrencySymbol);

  const personDebtors = debtors.filter(debtor => debtor.type === 'Person');
  const otherAccountsDebtors = debtors.filter(
    debtor => debtor.type !== 'Person',
  );

  const totalDebts = allDebtsCopy.reduce(
    (total, debt) => total + debt.amount,
    0,
  );

  let personTotalDebts = 0;
  let otherTotalDebts = 0;

  allDebtsCopy.forEach(debt => {
    if (debt.debtor.type === 'Person') {
      personTotalDebts += debt.amount;
    } else {
      otherTotalDebts += debt.amount;
    }
  });

  useEffect(() => {
    dispatch({type: FETCH_ALL_DEBTOR_DATA});
    dispatch(getAllDebtRequest());
  }, []);
  
  return {
    colors,
    debtors,
    allDebts,
    allDebtsCopy,
    debtorType,
    setDebtorType,
    currencySymbol,
    personDebtors,
    otherAccountsDebtors,
    totalDebts,
    personTotalDebts,
    otherTotalDebts,
  };
};

export default useDebts;
