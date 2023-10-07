import React from 'react'

interface IBettingTableProps {
    bet : number,
    outcome: string
};

function BettingTable( props : IBettingTableProps) {
  return (
    <div className='p-8'>
        
        <div className={`table w-full`}>

  
            <div className="table-row-group border-solid border-2 border-black">

                <div className={`table-row ${props.outcome == 'RoyalFlush' ? 'bg-red-600': ''}`}>
                    <div className={`table-cell text-left`}>Royal Flush</div>
                    <div className={`table-cell text-left ${props.bet == 1 ? 'bg-red-600': ''}`}>250</div>
                    <div className={`table-cell text-left ${props.bet == 2 ? 'bg-red-600': ''}`}>500</div>
                    <div className={`table-cell text-left ${props.bet == 3 ? 'bg-red-600': ''}`}>750</div>
                    <div className={`table-cell text-left ${props.bet == 4 ? 'bg-red-600': ''}`}>1000</div>
                    <div className={`table-cell text-left ${props.bet == 5 ? 'bg-red-600': ''}`}>4000</div>
                </div>

                <div className={`table-row ${props.outcome == 'StraightFlush' ? 'bg-red-600': ''}`}>
                    <div className={`table-cell text-left`}>Straight Flush</div>
                    <div className={`table-cell text-left ${props.bet == 1 ? 'bg-red-600': ''}`}>50</div>
                    <div className={`table-cell text-left ${props.bet == 2 ? 'bg-red-600': ''}`}>100</div>
                    <div className={`table-cell text-left ${props.bet == 3 ? 'bg-red-600': ''}`}>150</div>
                    <div className={`table-cell text-left ${props.bet == 4 ? 'bg-red-600': ''}`}>200</div>
                    <div className={`table-cell text-left ${props.bet == 5 ? 'bg-red-600': ''}`}>250</div>
                </div>

                <div className={`table-row ${props.outcome == 'FourOfAKind' ? 'bg-red-600': ''}`}>
                    <div className={`table-cell text-left`}>Four of a Kind</div>
                    <div className={`table-cell text-left ${props.bet == 1 ? 'bg-red-600': ''}`}>25</div>
                    <div className={`table-cell text-left ${props.bet == 2 ? 'bg-red-600': ''}`}>50</div>
                    <div className={`table-cell text-left ${props.bet == 3 ? 'bg-red-600': ''}`}>75</div>
                    <div className={`table-cell text-left ${props.bet == 4 ? 'bg-red-600': ''}`}>100</div>
                    <div className={`table-cell text-left ${props.bet == 5 ? 'bg-red-600': ''}`}>125</div>
                </div>


                <div className={`table-row ${props.outcome == 'FullHouse' ? 'bg-red-600': ''}`}>
                    <div className={`table-cell text-left`}>Full house</div>
                    <div className={`table-cell text-left ${props.bet == 1 ? 'bg-red-600': ''}`}>9</div>
                    <div className={`table-cell text-left ${props.bet == 2 ? 'bg-red-600': ''}`}>18</div>
                    <div className={`table-cell text-left ${props.bet == 3 ? 'bg-red-600': ''}`}>27</div>
                    <div className={`table-cell text-left ${props.bet == 4 ? 'bg-red-600': ''}`}>36</div>
                    <div className={`table-cell text-left ${props.bet == 5 ? 'bg-red-600': ''}`}>45</div>
                </div>

                <div className={`table-row ${props.outcome == 'Flush' ? 'bg-red-600': ''}`}>
                    <div className={`table-cell text-left`}>Flush</div>
                    <div className={`table-cell text-left ${props.bet == 1 ? 'bg-red-600': ''}`}>6</div>
                    <div className={`table-cell text-left ${props.bet == 2 ? 'bg-red-600': ''}`}>12</div>
                    <div className={`table-cell text-left ${props.bet == 3 ? 'bg-red-600': ''}`}>18</div>
                    <div className={`table-cell text-left ${props.bet == 4 ? 'bg-red-600': ''}`}>24</div>
                    <div className={`table-cell text-left ${props.bet == 5 ? 'bg-red-600': ''}`}>30</div>
                </div>

                <div className={`table-row ${props.outcome == 'Straight' ? 'bg-red-600': ''}`}>
                    <div className={`table-cell text-left`}>Straight</div>
                    <div className={`table-cell text-left ${props.bet == 1 ? 'bg-red-600': ''}`}>4</div>
                    <div className={`table-cell text-left ${props.bet == 2 ? 'bg-red-600': ''}`}>8</div>
                    <div className={`table-cell text-left ${props.bet == 3 ? 'bg-red-600': ''}`}>12</div>
                    <div className={`table-cell text-left ${props.bet == 4 ? 'bg-red-600': ''}`}>16</div>
                    <div className={`table-cell text-left ${props.bet == 5 ? 'bg-red-600': ''}`}>20</div>
                </div>

                <div className={`table-row ${props.outcome == 'ThreeOfAKind' ? 'bg-red-600': ''}`}>
                    <div className={`table-cell text-left`}>Three of a kind</div>
                    <div className={`table-cell text-left ${props.bet == 1 ? 'bg-red-600': ''}`}>3</div>
                    <div className={`table-cell text-left ${props.bet == 2 ? 'bg-red-600': ''}`}>6</div>
                    <div className={`table-cell text-left ${props.bet == 3 ? 'bg-red-600': ''}`}>9</div>
                    <div className={`table-cell text-left ${props.bet == 4 ? 'bg-red-600': ''}`}>12</div>
                    <div className={`table-cell text-left ${props.bet == 5 ? 'bg-red-600': ''}`}>15</div>
                </div>

                <div className={`table-row ${props.outcome == 'TwoPair' ? 'bg-red-600': ''}`}>
                    <div className={`table-cell text-left`}>Two pair</div>
                    <div className={`table-cell text-left ${props.bet == 1 ? 'bg-red-600': ''}`}>2</div>
                    <div className={`table-cell text-left ${props.bet == 2 ? 'bg-red-600': ''}`}>4</div>
                    <div className={`table-cell text-left ${props.bet == 3 ? 'bg-red-600': ''}`}>6</div>
                    <div className={`table-cell text-left ${props.bet == 4 ? 'bg-red-600': ''}`}>8</div>
                    <div className={`table-cell text-left ${props.bet == 5 ? 'bg-red-600': ''}`}>10</div>
                </div>

                <div className={`table-row ${props.outcome == 'JacksOrBetter' ? 'bg-red-600': ''}`}>
                    <div className={`table-cell text-left`}>Jacks or better</div>
                    <div className={`table-cell text-left ${props.bet == 1 ? 'bg-red-600': ''}`}>1</div>
                    <div className={`table-cell text-left ${props.bet == 2 ? 'bg-red-600': ''}`}>2</div>
                    <div className={`table-cell text-left ${props.bet == 3 ? 'bg-red-600': ''}`}>3</div>
                    <div className={`table-cell text-left ${props.bet == 4 ? 'bg-red-600': ''}`}>4</div>
                    <div className={`table-cell text-left ${props.bet == 5 ? 'bg-red-600': ''}`}>5</div>
                </div>

            </div>
        </div>

    </div>
  )
}

export default BettingTable