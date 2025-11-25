<?php

namespace App\Http\Controllers\Peso;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardUserController extends Controller
{
    public function getDailyAccounts(Request $request)
{
    $request->validate([
        'year' => 'required|integer|min:2021',
        'month' => 'required|integer|min:1|max:12',
    ]);

    $year = $request->year;
    $month = $request->month;
    $daysInMonth = Carbon::create($year, $month, 1)->daysInMonth;

    $dailyAccounts = User::selectRaw('DAY(created_at) as day, COUNT(*) as value')
        ->whereYear('created_at', $year)
        ->whereMonth('created_at', $month)
        ->groupByRaw('DAY(created_at)')
        ->orderBy('day')
        ->get()
        ->keyBy('day');

    $result = [];
    for ($day = 1; $day <= $daysInMonth; $day++) {
        $result[] = [
            'day' => $day,
            'value' => $dailyAccounts->has($day) ? $dailyAccounts[$day]->value : 0,
        ];
    }

    return response()->json($result);
}


}
