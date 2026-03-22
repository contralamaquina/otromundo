# --- CONFIGURACIÓN ---
$FolderPath = (Get-Location).Path # Usa '.' si el script está en la misma carpeta que las fotos.
                              # Si no, pon la ruta completa (ej: "C:\Users\TuUsuario\FotosSuculentas")
$Prefix = "suc"             # El prefijo para los nuevos nombres de archivo
$StartCounter = 1            # El número con el que quieres empezar a renombrar (ej: 1 para sucu001)
$Digits = 3                  # Número de dígitos para el contador (ej: 3 para 001, 002...).
                              # Si tienes más de 999 fotos, pon 4.
# -------------------

Write-Host ""
Write-Host "--- Iniciando Renombrado de Fotos ---"
Write-Host ""
Write-Host "Carpeta de trabajo: $FolderPath"
Write-Host "Prefijo: $Prefix"
Write-Host "Contador inicial: $StartCounter"
Write-Host ""

# Obtener todos los archivos en la carpeta, excluyendo directorios y el propio script
$Files = Get-ChildItem -Path $FolderPath -File | Where-Object { $_.Name -ne "renombrar.bat" -and $_.Extension -match '\.(jpg|jpeg|png|webp|gif|bmp|tiff)$' }

$CurrentCounter = $StartCounter

foreach ($File in $Files) {
    # Formatear el contador con el número de dígitos especificado
    $PaddedCounter = "{0:D$Digits}" -f $CurrentCounter

    # Construir el nuevo nombre completo
    $NewName = "$Prefix$PaddedCounter$($File.Extension)"

    Write-Host "Renombrando: '$($File.Name)' a '$NewName'"

    try {
        # Renombrar el archivo
        Rename-Item -Path $File.FullName -NewName $NewName -ErrorAction Stop
        Write-Host "OK: '$($File.Name)' renombrado."
    }
    catch {
        Write-Host "ERROR al renombrar '$($File.Name)'." -ForegroundColor Red
        Write-Host "Posibles razones: El nuevo nombre '$NewName' ya existe o hubo otro problema." -ForegroundColor Red
        Write-Host "Detalle del error: $($_.Exception.Message)" -ForegroundColor Red
    }

    # Incrementar el contador para el siguiente archivo
    $CurrentCounter++
}

Write-Host ""
Write-Host "--- Proceso de Renombrado Finalizado ---"
Write-Host "Presiona cualquier tecla para continuar..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null