<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EnviarRechazoSolicitudNA extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($datos_mensaje)
    {
        //
        $this->msg=$datos_mensaje;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        $codigo = $this->msg->c_codSolicitud;

        return new Envelope(
            subject: 'Solicitud - '.$codigo,
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        $nombre = $this->msg->c_nombres;
        $a_Pater = $this->msg->c_apellidoP;
        $a_Mater = $this->msg->c_apellidoM;

        return new Content(
            view: 'emails.rechazoSolicitud',
            with: [
                'nombre_completo' => strtoupper($nombre." ".$a_Pater." ".$a_Mater),
                'facultad' => $this->msg->c_nomFacultad,
                'finalidad' => $this->msg->c_nomFinalidadSolicitud,
                'comentario' => $this->msg->c_comentarioSolicitud,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
