<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class ArrayExport implements FromArray, WithHeadings, WithStyles, WithColumnWidths
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function array(): array
    {
        return $this->data;
    }

    public function headings(): array
    {
        return [
            'Title',
            'Company',
            'Total Applicant',
            'Job Type',
            'Place of Assignment',
            'Salary',
            'Total Vacancy',
            'Date Posted',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        // Get the last row number
        $lastRow = count($this->data) + 1;

        // Style the header row
        $sheet->getStyle('A1:H1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => '084896'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        // Style all data rows
        $sheet->getStyle('A2:H' . $lastRow)->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_LEFT,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true, // Enable text wrapping
            ],
        ]);

        // Center align specific columns (Total Applicant, Total Vacancy)
        $sheet->getStyle('C2:C' . $lastRow)->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        $sheet->getStyle('G2:G' . $lastRow)->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        return [];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 30,  // Title
            'B' => 25,  // Company
            'C' => 18,  // Total Applicant
            'D' => 15,  // Job Type
            'E' => 30,  // Place of Assignment
            'F' => 20,  // Salary
            'G' => 18,  // Total Vacancy
            'H' => 20,  // Date Posted
        ];
    }
}