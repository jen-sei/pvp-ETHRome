import React from 'react'

interface IBettingTableProps {
    bet : number,
    outcome: string
};

function BettingTable( props : IBettingTableProps) {
  return (
    <div className='p-8'>
        
        <div className={`table w-full text-lg`}>

  
            <div className="table-row-group">

                <div className={`table-row ${props.outcome == 'RoyalFlush' ? 'bg-red-600 opacity-50': ''}`}>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left bg-blue-300`}>Royal Flush</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 1 ? (props.outcome=='RoyalFlush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>250</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 2 ? (props.outcome=='RoyalFlush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>500</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 3 ? (props.outcome=='RoyalFlush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>750</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 4 ? (props.outcome=='RoyalFlush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>1000</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 5 ? (props.outcome=='RoyalFlush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>4000</div>
                </div>

                <div className={`table-row ${props.outcome == 'StraightFlush' ? 'bg-red-600 opacity-50': ''}`}>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left bg-blue-300`}>Straight Flush</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 1 ? (props.outcome=='StraightFlush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>50</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 2 ? (props.outcome=='StraightFlush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>100</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 3 ? (props.outcome=='StraightFlush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>150</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 4 ? (props.outcome=='StraightFlush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>200</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 5 ? (props.outcome=='StraightFlush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>250</div>
                </div>

                <div className={`table-row ${props.outcome == 'FourOfAKind' ? 'bg-red-600 opacity-50': ''}`}>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left bg-blue-300`}>Four of a Kind</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 1 ? (props.outcome=='FourOfAKind'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>25</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 2 ? (props.outcome=='FourOfAKind'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>50</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 3 ? (props.outcome=='FourOfAKind'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>75</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 4 ? (props.outcome=='FourOfAKind'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>100</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 5 ? (props.outcome=='FourOfAKind'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>125</div>
                </div>


                <div className={`table-row ${props.outcome == 'FullHouse' ? 'bg-red-600 opacity-50': ''}`}>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left bg-blue-300`}>Full house</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 1 ? (props.outcome=='FullHouse'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>9</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 2 ? (props.outcome=='FullHouse'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>18</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 3 ? (props.outcome=='FullHouse'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>27</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 4 ? (props.outcome=='FullHouse'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>36</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 5 ? (props.outcome=='FullHouse'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>45</div>
                </div>

                <div className={`table-row ${props.outcome == 'Flush' ? 'bg-red-600 opacity-50': ''}`}>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left bg-blue-300`}>Flush</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 1 ? (props.outcome=='Flush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>6</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 2 ? (props.outcome=='Flush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>12</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 3 ? (props.outcome=='Flush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>18</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 4 ? (props.outcome=='Flush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>24</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 5 ? (props.outcome=='Flush'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>30</div>
                </div>

                <div className={`table-row ${props.outcome == 'Straight' ? 'bg-red-600 opacity-50': ''}`}>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left bg-blue-300`}>Straight</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 1 ? (props.outcome=='Straight'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>4</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 2 ? (props.outcome=='Straight'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>8</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 3 ? (props.outcome=='Straight'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>12</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 4 ? (props.outcome=='Straight'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>16</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 5 ? (props.outcome=='Straight'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>20</div>
                </div>

                <div className={`table-row ${props.outcome == 'ThreeOfAKind' ? 'bg-red-600 opacity-50': ''}`}>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left bg-blue-300`}>Three of a kind</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 1 ? (props.outcome=='ThreeOfAKind'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>3</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 2 ? (props.outcome=='ThreeOfAKind'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>6</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 3 ? (props.outcome=='ThreeOfAKind'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>9</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 4 ? (props.outcome=='ThreeOfAKind'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>12</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 5 ? (props.outcome=='ThreeOfAKind'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>15</div>
                </div>

                <div className={`table-row ${props.outcome == 'TwoPair' ? 'bg-red-600 opacity-50': ''}`}>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left bg-blue-300`}>Two pair</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 1 ? (props.outcome=='TwoPair'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>2</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 2 ? (props.outcome=='TwoPair'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>4</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 3 ? (props.outcome=='TwoPair'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>6</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 4 ? (props.outcome=='TwoPair'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>8</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 5 ? (props.outcome=='TwoPair'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>10</div>
                </div>

                <div className={`table-row ${props.outcome == 'JacksOrBetter' ? 'bg-red-600 opacity-50': ''}`}>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left bg-blue-300`}>Jacks or better</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 1 ? (props.outcome=='JacksOrBetter'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>1</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 2 ? (props.outcome=='JacksOrBetter'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>2</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 3 ? (props.outcome=='JacksOrBetter'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>3</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 4 ? (props.outcome=='JacksOrBetter'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>4</div>
                    <div className={`table-cell px-4 border-solid border-2 border-black text-left ${props.bet == 5 ? (props.outcome=='JacksOrBetter'? 'bg-red-600 rainbow':'bg-red-600'): 'bg-blue-300'}`}>5</div>
                </div>

            </div>
        </div>

    </div>
  )
}

export default BettingTable