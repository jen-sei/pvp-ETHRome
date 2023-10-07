import React from 'react'

interface IBettingTableProps {
    bet : number,
};

function BettingTable( props : IBettingTableProps) {
  return (
    <div>
        
        <div className={`table w-full`}>

  
            <div className="table-row-group">

                <div className="table-row">
                    <div className="table-cell text-left">Royal Flush</div>
                    <div className="table-cell text-left">250</div>
                    <div className="table-cell text-left">500</div>
                    <div className="table-cell text-left">750</div>
                    <div className="table-cell text-left">1000</div>
                    <div className="table-cell text-left">4000</div>
                </div>

                <div className="table-row">
                    <div className="table-cell text-left">Straight Flush</div>
                    <div className="table-cell text-left">50</div>
                    <div className="table-cell text-left">100</div>
                    <div className="table-cell text-left">150</div>
                    <div className="table-cell text-left">200</div>
                    <div className="table-cell text-left">250</div>
                </div>

                <div className="table-row">
                    <div className="table-cell text-left">Four of a Kind</div>
                    <div className="table-cell text-left">25</div>
                    <div className="table-cell text-left">50</div>
                    <div className="table-cell text-left">75</div>
                    <div className="table-cell text-left">100</div>
                    <div className="table-cell text-left">125</div>
                </div>


                <div className="table-row">
                    <div className="table-cell text-left">Full house</div>
                    <div className="table-cell text-left">9</div>
                    <div className="table-cell text-left">18</div>
                    <div className="table-cell text-left">27</div>
                    <div className="table-cell text-left">36</div>
                    <div className="table-cell text-left">45</div>
                </div>

                <div className="table-row">
                    <div className="table-cell text-left">Flush</div>
                    <div className="table-cell text-left">6</div>
                    <div className="table-cell text-left">12</div>
                    <div className="table-cell text-left">18</div>
                    <div className="table-cell text-left">24</div>
                    <div className="table-cell text-left">30</div>
                </div>

                <div className="table-row">
                    <div className="table-cell text-left">Straight</div>
                    <div className="table-cell text-left">4</div>
                    <div className="table-cell text-left">8</div>
                    <div className="table-cell text-left">12</div>
                    <div className="table-cell text-left">16</div>
                    <div className="table-cell text-left">20</div>
                </div>

                <div className="table-row">
                    <div className="table-cell text-left">Three of a kind</div>
                    <div className="table-cell text-left">3</div>
                    <div className="table-cell text-left">6</div>
                    <div className="table-cell text-left">9</div>
                    <div className="table-cell text-left">12</div>
                    <div className="table-cell text-left">15</div>
                </div>

                <div className="table-row">
                    <div className="table-cell text-left">Two pairs</div>
                    <div className="table-cell text-left">2</div>
                    <div className="table-cell text-left">4</div>
                    <div className="table-cell text-left">6</div>
                    <div className="table-cell text-left">8</div>
                    <div className="table-cell text-left">10</div>
                </div>

                <div className="table-row">
                    <div className="table-cell text-left">Jacks or better</div>
                    <div className="table-cell text-left">1</div>
                    <div className="table-cell text-left">2</div>
                    <div className="table-cell text-left">3</div>
                    <div className="table-cell text-left">4</div>
                    <div className="table-cell text-left">5</div>
                </div>

            </div>
        </div>

    </div>
  )
}

export default BettingTable