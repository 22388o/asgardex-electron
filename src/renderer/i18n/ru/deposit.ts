import { DepositMessages } from '../types'

const deposit: DepositMessages = {
  'deposit.interact.actions.bond': 'Вложить',
  'deposit.interact.actions.unbond': 'Изъять',
  'deposit.interact.actions.leave': 'Выйти',
  'deposit.interact.title': 'Вклад',
  'deposit.interact.subtitle': 'Взаимодействие с THORСhain',
  'deposit.interact.label.bondprovider': 'Bond provider (optional) - RU',
  'deposit.share.title': 'Ваша общая доля в пуле',
  'deposit.share.units': 'Единицы ликвидности',
  'deposit.share.poolshare': 'Доля в пуле',
  'deposit.share.total': 'Общее значение',
  'deposit.redemption.title': 'Текущая стоимость покупки',
  'deposit.totalEarnings': 'Ваш общий доход от пула',
  'deposit.add.asym': 'Добавить {asset}',
  'deposit.add.sym': 'Добавить',
  'deposit.add.state.sending': 'Отправка транзакции для вклада',
  'deposit.add.state.checkResults': 'Проверка статуса вклада',
  'deposit.add.state.pending': 'Добавление вклада',
  'deposit.add.state.success': 'Вклад успешно совершен',
  'deposit.add.state.error': 'Ошибка вложения средств',
  'deposit.add.error.chainFeeNotCovered': 'Необходимая комиссия {fee} не покрывается вашим балансом: {balance}',
  'deposit.add.error.nobalances': 'Нет средств',
  'deposit.add.error.nobalance1': 'У вас нет средств на балансе {asset} в кошелке для вклада',
  'deposit.add.error.nobalance2': 'У вас нет средств на балансах {asset1} и {asset2} в кошельке для вклада',
  'deposit.add.pendingAssets.title': 'Обнаружены ожидающие активы',
  'deposit.add.pendingAssets.description':
    'Эти активы были успешно отправлены, но транзакция для другого актива не была завершена или возникла ошибка, при ее отправке:',
  'deposit.add.pendingAssets.recoveryDescription':
    'Обратите внимение: Транзакции для разных пар активов могут занимать разное время, так как запущены на разных блок-чейнах. В случае ошибки, у вас есть возможность изъять ожидающие активы с помощью утилиты возврата THORSWap по адресу {url}. Эта функция пока недоступна в ПК версии ASGARDEX.',
  'deposit.add.pendingAssets.recoveryTitle': 'Открыть утилиту для возврата',
  'deposit.add.asymAssets.title': 'Найден асиметричный вклад',
  'deposit.add.asymAssets.description':
    'Добавление симметричной пары активов отключено из-за предыдущего не симметричного депозита следующего(их) актива(ов):',
  'deposit.add.asymAssets.recoveryDescription':
    'Асимметричное добавление не поддерживается в текущей версии ASGARDEX. Однако вы можете использовать эту функцию в THORSwap, чтобы снять предыдущий асимметричный депозит.',
  'deposit.add.asymAssets.recoveryTitle': 'THORSwap',
  'deposit.add.assetMissmatch.title': 'Обнаружено несоответствие активов',
  'deposit.add.assetMissmatch.description':
    'Однин из текущих выбранных активов уже использовался в предыдущем вкладе с другим активом. Проверьте следующие адреса, чтобы увидеть предыдущую внесённую пару.',
  'deposit.bond.state.error': 'Ошибка при вложении средств',
  'deposit.unbond.state.error': 'Ошибка при выводе',
  'deposit.leave.state.error': 'Ошибка при выходе',
  'deposit.advancedMode': 'Расширенный режим',
  'deposit.poolDetails.depth': 'Глубина',
  'deposit.poolDetails.24hvol': 'Количество за 24ч',
  'deposit.poolDetails.allTimeVal': 'Количество за все время',
  'deposit.poolDetails.totalSwaps': 'Всего обменов',
  'deposit.poolDetails.totalUsers': 'Всего пользхователей',
  'deposit.poolDetails.volumeTotal': 'Количество (всего)',
  'deposit.poolDetails.earnings': 'Прибыль',
  'deposit.poolDetails.ilpPaid': 'Страховки выплачено',
  'deposit.poolDetails.totalTx': 'Транзакций',
  'deposit.poolDetails.totalFees': 'Комиссии (всего)',
  'deposit.poolDetails.members': 'Участники',
  'deposit.poolDetails.apy': 'APY',
  'deposit.wallet.add': 'Добавить',
  'deposit.wallet.connect': 'Пожалуйсста добавьте свой кошелек',
  'deposit.pool.noShares': 'У вас нет доли в этом пуле',
  'deposit.withdraw.sym': 'Вывести',
  'deposit.withdraw.asym': 'Вывести {asset}',
  'deposit.withdraw.sym.title': 'Корректировка вывода (симметрично)',
  'deposit.withdraw.asym.title': 'Корректировка вывода (асимметрично)',
  'deposit.withdraw.pending': 'Вывести',
  'deposit.withdraw.success': 'Успешно выведено',
  'deposit.withdraw.error': 'Ошибка при выводе',
  'deposit.withdraw.choseText': 'Выберите сколько вы хотите изять от 0% до 100%',
  'deposit.withdraw.fees': 'Комиссия транзакции: {thorMemo}, Исходящие комиссии: {thorOut} + {assetOut}',
  'deposit.withdraw.feeNote': 'Важно: {fee} BNB останется на вашем кошельке для покрытия комисий.',
  'deposit.withdraw.error.feeNotCovered':
    'Комиссия транзакции {fee} должна покрываться вашим балансом (баланс: {balance})',
  'deposit.withdraw.ledger.sign': 'Нажмите далее, чтобы подписать транзакцию снятия средств на вашем устройстве.',
  'deposit.ledger.sign': 'Нажмите далее, чтобы подписать транзакцию вложения средств на вашем устройстве.'
}

export default deposit
